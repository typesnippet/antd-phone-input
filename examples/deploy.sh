#!/bin/bash
cd ~/antd-phone-input/
git restore .
git pull

nvm use 18
npm i -g yarn

cd ~/antd-phone-input/examples/antd4.x
yarn && yarn build

cd ~/antd-phone-input/examples/antd5.x
yarn && yarn build

sudo rm -r /var/www/playground/antd-phone-input/*
sudo mkdir /var/www/playground/antd-phone-input/antd4.x
sudo mkdir /var/www/playground/antd-phone-input/antd5.x
sudo cp -r ~/antd-phone-input/examples/antd4.x/build/* /var/www/playground/antd-phone-input/antd4.x
sudo cp -r ~/antd-phone-input/examples/antd5.x/build/* /var/www/playground/antd-phone-input/antd5.x

sudo service nginx restart