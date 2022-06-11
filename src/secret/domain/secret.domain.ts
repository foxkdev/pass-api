export class Secret {
  id: string;
  name: string;
  type: string;
  content: object;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, name, type, content, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static build(secret) {
    return new Secret(secret);
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
