# turbo-ignore.sh
if git diff --quiet HEAD^ HEAD -- apps/admin packages; then
  echo "🟢 No changes in admin or shared packages, skipping build"
  exit 0
fi
