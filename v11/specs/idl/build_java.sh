#!/usr/bin/env bash

mkdir java
protoc -I . --proto_path=. --java_out ./java *.proto
