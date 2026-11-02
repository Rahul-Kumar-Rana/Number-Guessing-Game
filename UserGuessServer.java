
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.Random;

public class UserGuessServer {
    private static int secreteNum;

    public static void main(String[] args) throws IOException {
        generateNewNumber();

        HttpServer server = HttpServer.create(new InetSocketAddress(8081), 0);

        server.createContext("/game1/guess", new GuessHandler());
        server.createContext("/game1/restart", new RestartHandler());

        server.setExecutor(null);
        System.out.println("Java Backend Server started on port 8081...");
        server.start();
    }

    private static void generateNewNumber() {
        Random randomNum = new Random();
        secreteNum = randomNum.nextInt(100) + 1;
        System.out.println("Computer thought of a new number! (For Testing: " + secreteNum + ")");
    }

    static class GuessHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

            String query = exchange.getRequestURI().getQuery();
            String response = "";

            if (query != null && query.startsWith("num=")) {
                try {
                    int chooseNum = Integer.parseInt(query.split("=")[1]);

                    if (secreteNum == chooseNum) {
                        response = "Congrulation! Ekdum sahi jawab.";
                    } else if (secreteNum > chooseNum) {
                        response = "Choose Greater Number";
                    } else {
                        response = "Choose Smaller Number";
                    }
                } catch (Exception e) {
                    response = "Invalid input!";
                }
            }

            sendResponse(exchange, response);
        }
    }

    static class RestartHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

            generateNewNumber();
            sendResponse(exchange, "Game restarted! New number generated:" + secreteNum);
        }
    }

    private static void sendResponse(HttpExchange exchange, String response) throws IOException {
        byte[] data = response.getBytes(java.nio.charset.StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
        exchange.sendResponseHeaders(200, data.length);

        OutputStream os = exchange.getResponseBody();
        os.write(data);
        os.close();
    }
}
