#!/usr/bin/env bash

mkdir go
protoc -I . --proto_path=. --go_out ./go *.proto
