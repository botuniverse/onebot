#!/usr/bin/env bash

mkdir python
protoc -I . --proto_path=. --python_out ./python *.proto
