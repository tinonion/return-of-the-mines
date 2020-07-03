#!/bin/bash

root_dir=$PWD

function build_rust {
    cd src/rust/web-server
    cargo build
    cd ..
    cp -r web-server $root_dir/build
    cd $root_dir
}


function build_all {
    rm -rf build
    mkdir build

    cd src/js
    rm -rf build
    npm run-script build
    mv build $root_dir
    cd $root_dir

    # deleted rust build, gotta make it again
    build_rust
}

only_rs=''

while getopts 'r' flag; do
    case "${flag}" in
        r) only_rs='true' ;;
    esac
done

if [[ $only_rs == 'true' ]]; then
    echo Building only rust code
    build_rust

else
    echo Building javascript and rust code
    build_all
fi