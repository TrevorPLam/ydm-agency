---
trigger: model_decision
---

<package_boundaries>
- Domain packages must not import from other domain packages directly
- Use event bus for cross-domain communication
- Infrastructure packages can be imported by domain packages
- Marketing packages are standalone and should not import domain packages
- UI packages can import from domain packages
- Never create circular dependencies between packages
- Use dependency-cruiser to validate boundaries
</package_boundaries>
