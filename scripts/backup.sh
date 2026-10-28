#!/bin/bash
set -e

echo "📦 ShopIntelli AI - Backup Script"
echo "=================================="

NAMESPACE=${1:-shopintelli}
BACKUP_DIR=${2:-./backups}
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo "Namespace: $NAMESPACE"
echo "Backup directory: $BACKUP_DIR"
echo "Timestamp: $TIMESTAMP"
echo ""

# Create backup directory
mkdir -p "$BACKUP_DIR/$TIMESTAMP"

echo "🗄️ Backing up MySQL database..."
MYSQL_POD=$(kubectl get pod -n $NAMESPACE -l app=mysql -o jsonpath="{.items[0].metadata.name}")

if [ ! -z "$MYSQL_POD" ]; then
    kubectl exec -n $NAMESPACE $MYSQL_POD -- mysqldump -u root -prootpassword shopintelli > "$BACKUP_DIR/$TIMESTAMP/database.sql"
    echo "✓ Database backup completed: $BACKUP_DIR/$TIMESTAMP/database.sql"
else
    echo "✗ MySQL pod not found"
fi

echo ""
echo "📮 Backing up Redis data..."
REDIS_POD=$(kubectl get pod -n $NAMESPACE -l app=redis -o jsonpath="{.items[0].metadata.name}")

if [ ! -z "$REDIS_POD" ]; then
    kubectl exec -n $NAMESPACE $REDIS_POD -- redis-cli SAVE
    kubectl cp $NAMESPACE/$REDIS_POD:/data/dump.rdb "$BACKUP_DIR/$TIMESTAMP/redis-dump.rdb"
    echo "✓ Redis backup completed: $BACKUP_DIR/$TIMESTAMP/redis-dump.rdb"
else
    echo "✗ Redis pod not found"
fi

echo ""
echo "💾 Backing up persistent volumes..."
kubectl get pvc -n $NAMESPACE -o yaml > "$BACKUP_DIR/$TIMESTAMP/pvc-backup.yaml"
echo "✓ PVC configuration saved"

echo ""
echo "⚙️ Backing up Kubernetes configurations..."
kubectl get all -n $NAMESPACE -o yaml > "$BACKUP_DIR/$TIMESTAMP/k8s-resources.yaml"
kubectl get secrets -n $NAMESPACE -o yaml > "$BACKUP_DIR/$TIMESTAMP/secrets.yaml"
kubectl get configmaps -n $NAMESPACE -o yaml > "$BACKUP_DIR/$TIMESTAMP/configmaps.yaml"
echo "✓ Kubernetes configurations saved"

echo ""
echo "🗜️ Compressing backup..."
cd "$BACKUP_DIR"
tar -czf "shopintelli-backup-$TIMESTAMP.tar.gz" "$TIMESTAMP"
rm -rf "$TIMESTAMP"
echo "✓ Backup compressed: shopintelli-backup-$TIMESTAMP.tar.gz"

echo ""
echo "✅ Backup completed successfully!"
echo "Backup location: $BACKUP_DIR/shopintelli-backup-$TIMESTAMP.tar.gz"
echo ""
echo "To restore this backup, use:"
echo "  ./scripts/restore.sh $BACKUP_DIR/shopintelli-backup-$TIMESTAMP.tar.gz"
