aws dynamodb create-table \
    --table-name Session \
    --attribute-definitions \
    AttributeName=Id,AttributeType=S \
    AttributeName=Type,AttributeType=S \
    AttributeName=Code,AttributeType=S \
    --key-schema \
    AttributeName=Id,KeyType=HASH \
    AttributeName=Type,KeyType=RANGE \
    --provisioned-throughput \
    ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --global-secondary-indexes \
    '[
      {
        "IndexName": "CodeIndex",
        "KeySchema": [
          {
            "AttributeName": "Code",
            "KeyType": "HASH"
            }
        ],
        "Projection": {
          "ProjectionType": "ALL"
        },
        "ProvisionedThroughput": {
          "ReadCapacityUnits": 3,
          "WriteCapacityUnits": 2
        }
      }
    ]' \
  --endpoint-url http://localhost:8000