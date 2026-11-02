
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY UserGuessServer.java .

RUN javac UserGuessServer.java

CMD ["java", "UserGuessServer"]
