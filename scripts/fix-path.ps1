<#
scripts/fix-path.ps1

Auto-detect common install locations and add missing folders to the User PATH so tools like docker, php, composer, and mysql are recognized in PowerShell.

Run from repo root (no admin required):
PowerShell -ExecutionPolicy Bypass -File .\scripts\fix-path.ps1

This only edits the User PATH; you must close and re-open PowerShell for changes to apply (or run refreshenv if you have Chocolatey).
#>

Write-Host "Detecting common program locations and fixing User PATH if needed...`n"

function Add-UserPath($newPath) {
    if (-not (Test-Path $newPath)) { return $false }
    $userPath = [Environment]::GetEnvironmentVariable("Path","User")
    if (-not $userPath) { $userPath = "" }
    $paths = $userPath.Split(';') | Where-Object { $_ -ne "" }
    if ($paths -contains $newPath) { return $false }
    $newUserPath = ($userPath.TrimEnd(';')) + ";" + $newPath
    [Environment]::SetEnvironmentVariable("Path", $newUserPath, "User")
    return $true
}

$changes = @()
$targets = @{}

# docker
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    $possibleDocker = @(
        'C:\Program Files\Docker\Docker\resources\bin',
        'C:\Program Files\Docker\Docker',
        'C:\Program Files\Docker\resources\bin'
    )
    foreach ($p in $possibleDocker) { if (Test-Path (Join-Path $p 'docker.exe')) { $targets['docker']=$p; break } }
}

# php
if (-not (Get-Command php -ErrorAction SilentlyContinue)) {
    $possiblePhp = @(
        'C:\tools\php',
        'C:\Program Files\php',
        'C:\Program Files\PHP',
        'C:\Program Files (x86)\PHP'
    )
    foreach ($p in $possiblePhp) { if (Test-Path (Join-Path $p 'php.exe')) { $targets['php']=$p; break } }
}

# composer
if (-not (Get-Command composer -ErrorAction SilentlyContinue)) {
    $possibleComposer = @(
        'C:\ProgramData\ComposerSetup\bin',
        'C:\Program Files\Composer',
        'C:\Program Files (x86)\Composer'
    )
    foreach ($p in $possibleComposer) { if (Test-Path $p) { $targets['composer']=$p; break } }
}

# mysql
if (-not (Get-Command mysql -ErrorAction SilentlyContinue)) {
    $possibleMysql = @(
        'C:\Program Files\MySQL\MySQL Server 8.0\bin',
        'C:\Program Files\MySQL\MySQL Server 5.7\bin',
        'C:\Program Files\MySQL\MySQL Server 8.1\bin'
    )
    foreach ($p in $possibleMysql) { if (Test-Path (Join-Path $p 'mysql.exe')) { $targets['mysql']=$p; break } }
}

# If nothing was auto-detected, search some common roots (fast) — limited scope to avoid long scans
if ($targets.Count -eq 0) {
    Write-Host "No common install folders auto-detected. I'll do a quick search for 'docker.exe', 'php.exe', 'composer.phar', 'mysql.exe' in C:\Program Files and C:\tools...`n"
    $roots = @('C:\Program Files','C:\Program Files (x86)','C:\tools')
    foreach ($r in $roots) {
        if (-not (Test-Path $r)) { continue }
        Get-ChildItem -Path $r -Recurse -Directory -Depth 2 -ErrorAction SilentlyContinue | ForEach-Object {
            $p = $_.FullName
            if ((-not $targets.ContainsKey('docker')) -and (Test-Path (Join-Path $p 'docker.exe'))) { $targets['docker']=$p }
            if ((-not $targets.ContainsKey('php')) -and (Test-Path (Join-Path $p 'php.exe'))) { $targets['php']=$p }
            if ((-not $targets.ContainsKey('composer')) -and ((Test-Path (Join-Path $p 'composer.phar')) -or (Test-Path (Join-Path $p 'composer.bat')) -or (Test-Path (Join-Path $p 'composer.exe')))) { $targets['composer']=$p }
            if ((-not $targets.ContainsKey('mysql')) -and (Test-Path (Join-Path $p 'mysql.exe'))) { $targets['mysql']=$p }
        }
    }
}

# Add discovered targets to User PATH
foreach ($k in $targets.Keys) {
    $p = $targets[$k]
    if ($p) {
        if (Add-UserPath $p) { $changes += "Added $p to User PATH (for $k)" } else { $changes += "$p already in User PATH (for $k)" }
    } else {
        $changes += "No path found automatically for $k"
    }
}

if ($changes.Count -eq 0) { Write-Host "No changes were necessary." } else { $changes | ForEach-Object { Write-Host $_ } }

Write-Host "`nDone. To apply changes: close and re-open PowerShell (or run 'refreshenv' if you have Chocolatey). Then verify with: docker --version; php --version; composer --version; mysql --version" -ForegroundColor Yellow
