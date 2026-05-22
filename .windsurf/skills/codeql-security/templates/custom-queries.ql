/**
 * @name No console.log in production
 * @description Prevent console.log in production code
 * @kind problem
 * @problem.severity error
 * @id js/no-console-log
 */

import javascript

from CallExpr c
where c.callee.(PropertyAccess).propertyName = "log"
select c, "Avoid console.log in production code"
