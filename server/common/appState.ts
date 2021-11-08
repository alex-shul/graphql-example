const delayMs = 100;

export class AppState {
    public static isComplete = false;

    private static waiting = () => {
      if (!AppState.isComplete) {
        setTimeout(AppState.waiting, delayMs);
      } else {
        process.exit();
      }
    };

    public static Begin(): void {
      this.isComplete = false;
      AppState.waiting();
    }

    public static End(): void {
      this.isComplete = true;
    }
}
