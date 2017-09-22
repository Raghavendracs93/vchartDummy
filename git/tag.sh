#!/usr/bin/sh

VER=$1
MSG=$2
sudo git config credential.helper 'cache --timeout=86400000'
sudo git tag -a $VER -m "$MSG"
if [ "$?" = "0" ]
then
    sudo git push origin $VER
else
    echo "$VER tag already exists"
fi