#!/bin/bash
while IFS='' read -r line || [[ -n "$line" ]]; do
    curl -XPOST 'localhost:9200/bigfoot/witness' -H "Content-Type: application/json" -d "$line"
done < "$1"
