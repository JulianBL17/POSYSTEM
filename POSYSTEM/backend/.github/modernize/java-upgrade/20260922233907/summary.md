# Upgrade Summary: POS

- **Session**: 20260922233907
- **Date**: 2026-09-22
- **Branch**: appmod/java-upgrade-20260922233907
- **Commit**: 94e97274faa212773ac79fbdc8e8f85b32a48bd2

## Result

Java runtime and Maven compilation target upgraded from Java 17 to Java 25 LTS in `backend/pom.xml`.

## Validation

- JDK: 25.0.2
- Maven: 3.9.12
- `mvn clean test-compile -q`: passed
- `mvn clean test -q`: passed, 100% of tests
- Final dependency CVE scan: no known CVEs

## Security Changes

The PostgreSQL JDBC driver was upgraded from the Spring Boot-managed 42.6.0 to 42.7.12. Intermediate scan findings required 42.7.11 and then 42.7.12; the final scan is clean.

## Limitations

The Java 17 baseline was skipped because JDK 17 was not installed on the machine. Existing hook-script modifications were preserved.
