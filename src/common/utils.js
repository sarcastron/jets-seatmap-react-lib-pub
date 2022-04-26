export class JetsUtils {
  static generateId() {
    return '_' + Math.random().toString(36).substring(2, 9);
  }
}
