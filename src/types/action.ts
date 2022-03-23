export interface GCAction {
  action(): void;
  after(): void;
  before(): void;
}
