#!/usr/bin/env bash

mkdir cpp
protoc -I . --proto_path=. --cpp_out ./cpp *.proto
