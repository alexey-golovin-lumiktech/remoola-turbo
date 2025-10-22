read -p "enter migration-name:" ANS
./node_modules/.bin/typeorm migration:create -o src/migrations/$ANS