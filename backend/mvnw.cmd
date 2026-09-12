@echo off
setlocal
if exist "%USERPROFILE%\apache-maven-3.9.9\bin\mvn.cmd" (
    "%USERPROFILE%\apache-maven-3.9.9\bin\mvn.cmd" %*
) else (
    mvn %*
)
endlocal
