{
  "forbidden": [
    {
      "name": "domain-to-infrastructure",
      "severity": "error",
      "comment": "Domain packages should not import from infrastructure",
      "from": { "path": "^packages/domain" },
      "to": { "path": "^packages/infrastructure" }
    }
  ]
}
