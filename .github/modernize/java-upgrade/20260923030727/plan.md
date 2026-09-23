# Upgrade Plan: POS (20260923030727)

- **Generated**: 2026-09-23 03:07:27
- **HEAD Branch**: fix/estructura-proyecto
- **HEAD Commit ID**: unavailable from the upgrade tooling

## Available Tools

**JDKs**
- JDK 25.0.2: `C:\Program Files\Java\jdk-25.0.2\bin` (available; used for the nested copy and final validation)
- JDK 17: not available (baseline for the root copy will be skipped)

**Build Tools**
- Maven 3.9.12: `C:\Users\Troyano\Documents\Maven\apache-maven-3.9.12\bin`
- Maven Wrapper: not present

## Guidelines

- Upgrade Spring Boot to the requested 3.5 release line.
- Preserve existing application behavior and security controls.
- Validate both Maven projects present in the workspace.

> Note: You can add any specific guidelines or constraints for the upgrade process here if needed, bullet points are preferred.

## Options

- Working branch: appmod/java-upgrade-20260923030727
- Run tests before and after the upgrade: true

## Upgrade Goals

- Spring Boot: 3.5.0

## Technology Stack

| Technology/Dependency | Current | Min Compatible Version | Why Incompatible |
| --------------------- | ------- | ---------------------- | ---------------- |
| Spring Boot parent (root `backend/pom.xml`) | 3.1.4 | 3.5.0 | User requested upgrade |
| Spring Boot parent (nested `POSYSTEM/backend/pom.xml`) | 3.1.4 | 3.5.0 | User requested upgrade |
| Java (root project) | 17 | 17 | Compatible with Spring Boot 3.5 |
| Java (nested project) | 25 | 17 | Compatible with Spring Boot 3.5; retain requested project setting |
| Maven | 3.9.12 | 3.9+ | Compatible and current |
| Spring Security | BOM-managed 6.x | BOM-managed 6.x | Existing lambda-based `SecurityFilterChain` is compatible |
| Spring Data JPA / Hibernate | BOM-managed | BOM-managed | Upgrade through Spring Boot BOM |
| PostgreSQL JDBC (root) | BOM-managed 42.6.0 | BOM-managed | Keep managed version unless CVE scan requires a patch |
| PostgreSQL JDBC (nested) | Explicit 42.7.12 | 42.7.12 | Retain explicit pin pending CVE validation |

## Derived Upgrades

- Spring Boot 3.5 updates Spring Framework, Spring Security, Spring Data, Hibernate, Thymeleaf integration, and managed transitive dependencies through the parent BOM.
- Java 17 remains the minimum runtime for the root project; Java 25 remains configured in the nested project because Spring Boot 3.5 supports the Java 17+ baseline.
- No Jakarta namespace rewrite is derived: the source scan found no `javax.*` imports or removed Spring Security APIs.
- No Maven upgrade is required: Maven 3.9.12 is already compatible.

## Impact Analysis

### Dependency Changes

| File | Dependency | Current | Action | Target | Reason |
|------|------------|---------|--------|--------|--------|
| `backend/pom.xml` | `spring-boot-starter-parent` | 3.1.4 | upgrade | 3.5.0 | Requested Spring Boot upgrade |
| `POSYSTEM/backend/pom.xml` | `spring-boot-starter-parent` | 3.1.4 | upgrade | 3.5.0 | Requested Spring Boot upgrade |
| `POSYSTEM/backend/pom.xml` | `org.postgresql:postgresql` | 42.7.12 explicit | retain | 42.7.12 | Explicit pin is newer than the old BOM value; do not remove without CVE review |

### Source Code Changes

No source changes are currently required. Both security configurations already use `SecurityFilterChain`, `authorizeHttpRequests`, and `requestMatchers`, which are compatible with Spring Security 6 managed by Spring Boot 3.5.

### Configuration Changes

No configuration property changes were found in the targeted scan. Existing datasource, JPA, Thymeleaf, and DevTools properties remain valid for the upgrade.

### CI/CD Changes

No CI/CD files with Java or Spring Boot version references were found in the workspace scope.

### Risks & Warnings

- **Managed dependency shifts**: Spring Boot 3.5 will update Hibernate, Spring Security, and other transitive dependencies. **Mitigation**: run `mvn clean test-compile` and the full test suite for both POMs.
- **No Java 17 installed**: The root project's baseline cannot be executed with its configured JDK. **Mitigation**: validate the root project with the available JDK 25 only if Maven permits the configured release, and record any limitation; install/use JDK 17 if compilation rejects the environment.
- **Database-backed runtime behavior**: Tests are absent and application startup may require PostgreSQL. **Mitigation**: perform compile/test validation and document runtime-only risk if the test/build environment cannot connect to the database.
- **Explicit PostgreSQL version**: The nested POM pins 42.7.12. **Mitigation**: preserve it during the framework upgrade and run CVE validation before final sign-off.

## Upgrade Steps

- Step 1: Setup Environment
  - **Rationale**: Confirm the available JDK and Maven needed for the upgrade.
  - **Changes to Make**: Use the installed JDK 25.0.2 and Maven 3.9.12; no installation required.
  - **Verification**: `java -version` and `mvn -version`; expected JDK 25.0.2 and Maven 3.9.12.

- Step 2: Setup Baseline
  - **Rationale**: Establish pre-upgrade compilation and test status where the base JDK is available.
  - **Changes to Make**: None; baseline is skipped for the root Java 17 copy because JDK 17 is unavailable.
  - **Verification**: Skipped for the unavailable base JDK; nested Java 25 baseline may be run with JDK 25.

- Step 3: Upgrade Spring Boot parents in both Maven projects
  - **Rationale**: Apply the requested Spring Boot 3.5.0 upgrade while keeping source and explicit security/database choices unchanged.
  - **Changes to Make**: Apply all Dependency Changes above in `backend/pom.xml` and `POSYSTEM/backend/pom.xml`.
  - **Verification**: `mvn clean test-compile -q` in each backend; expected successful main and test compilation.

- Step 4: CVE Validation and Fix
  - **Rationale**: Confirm the upgraded dependency graph has no reported known vulnerabilities and remediate any actionable findings.
  - **Changes to Make**: Update only dependency versions identified by the CVE scan; preserve security-related explicit pins unless a patched replacement is required.
  - **Verification**: dependency extraction, CVE scan, compile, and repeat scan; expected no actionable CVEs.

- Step 5: Final Validation
  - **Rationale**: Confirm the target parent versions, compilation, and complete test execution.
  - **Changes to Make**: Resolve any compile or test failures caused by the upgrade; remove temporary workarounds.
  - **Verification**: `mvn clean test -q` for both backends using available compatible JDK/tooling; expected 100% pass rate, with unavailable-environment limitations documented if applicable.
