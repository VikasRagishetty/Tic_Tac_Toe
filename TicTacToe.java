import java.util.Scanner;

public class TicTacToe {

    static char[][] board = new char[3][3];

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        initializeBoard();

        char currentPlayer = 'X';

        while (true) {

            printBoard();

            System.out.println("Player " + currentPlayer + "'s Turn");

            System.out.print("Enter row (0-2): ");
            int row = sc.nextInt();

            System.out.print("Enter column (0-2): ");
            int col = sc.nextInt();

            if (isValidMove(row, col)) {

                board[row][col] = currentPlayer;

                if (checkWinner(currentPlayer)) {
                    printBoard();
                    System.out.println("🎉 Player " + currentPlayer + " Wins!");
                    break;
                }

                if (isBoardFull()) {
                    printBoard();
                    System.out.println("It's a Draw!");
                    break;
                }

                currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';

            } else {
                System.out.println("Invalid Move! Try Again.");
            }
        }

        sc.close();
    }

    public static void initializeBoard() {

        for (int i = 0; i < 3; i++) {

            for (int j = 0; j < 3; j++) {

                board[i][j] = ' ';
            }
        }
    }

    public static void printBoard() {

        System.out.println();

        for (int i = 0; i < 3; i++) {

            for (int j = 0; j < 3; j++) {

                System.out.print(" " + board[i][j] + " ");

                if (j < 2)
                    System.out.print("|");
            }

            System.out.println();

            if (i < 2)
                System.out.println("---+---+---");
        }

        System.out.println();
    }

    public static boolean isValidMove(int row, int col) {

        if (row < 0 || row > 2 || col < 0 || col > 2)
            return false;

        return board[row][col] == ' ';
    }

    public static boolean checkWinner(char player) {

        // Rows
        for (int i = 0; i < 3; i++) {

            if (board[i][0] == player &&
                board[i][1] == player &&
                board[i][2] == player)
                return true;
        }

        // Columns
        for (int i = 0; i < 3; i++) {

            if (board[0][i] == player &&
                board[1][i] == player &&
                board[2][i] == player)
                return true;
        }

        // Main Diagonal
        if (board[0][0] == player &&
            board[1][1] == player &&
            board[2][2] == player)
            return true;

        // Secondary Diagonal
        if (board[0][2] == player &&
            board[1][1] == player &&
            board[2][0] == player)
            return true;

        return false;
    }

    public static boolean isBoardFull() {

        for (int i = 0; i < 3; i++) {

            for (int j = 0; j < 3; j++) {

                if (board[i][j] == ' ')
                    return false;
            }
        }

        return true;
    }
}