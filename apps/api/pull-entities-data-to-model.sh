#!/bin/bash

clear

echo "[INFO]: Pull entities data to *.entity.ts"
echo "[INFO]: This will generate TypeORM entities from PostgreSQL database."
echo "[WARNING]: Existing entity files in ./src/entities/ may be overwritten!"
echo "[WARNING]:️  This is experemental script:!"
read -p "[INFO]: Press Enter to proceed, CTRL + C to exit"

echo "[INFO]: Importing environment variables..."

if [ -f .env.development ]; then
    while IFS='=' read -r key value; do
        if [[ "$key" =~ ^# || -z "$key" || ! "$value" ]]; then
            continue
        fi
        value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')
        export "$key=$value"
    done < .env.development
else
    echo "[ERROR]: .env.development file not found!"
    exit 1
fi

if ! command -v npx typeorm-model-generator &> /dev/null; then
    echo "[ERROR]: typeorm-model-generator is not installed!"
    echo "[INFO]:  Install it using: npm install -g typeorm-model-generator"
    exit 1
fi

echo "[INFO]: Generating TypeORM entities from PostgreSQL database..."

TEMP_DIR="./temp-entities"
FINAL_DIR="./src/entities"

rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

npx typeorm-model-generator \
    -h "$POSTGRES_HOST" \
    -d "$POSTGRES_DB" \
    -u "$POSTGRES_USER" \
    -p "$POSTGRES_PORT" \
    -x "$POSTGRES_PASSWORD" \
    -e postgres \
    -o "$TEMP_DIR"

echo "[INFO]: Entities generated"


echo "[INFO]: Renaming entities and putting them to final folder..."

mkdir -p "$FINAL_DIR"

find "$TEMP_DIR" -type f -name '*.ts' | while read file; do
    filename=$(basename -- "$file" .ts)
    kebab_filename=$(echo "$filename" | sed -E 's/([a-z])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]')
    mv "$file" "$FINAL_DIR/$kebab_filename.entity.ts"
done

echo "[INFO]: Cleaning up..."

rm -rf "$TEMP_DIR"

echo "[INFO]: Done!"
