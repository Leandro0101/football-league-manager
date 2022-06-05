export type TeamOwnerApplicationObject = {
  id: string;
  name: string;
  password: string;
  email: string;
  emailVerified: boolean;
  updatedAt: Date;
  createdAt: Date;
};

type DTO = Omit<TeamOwnerApplicationObject, 'id' | 'updatedAt' | 'createdAt'>;

export class TeamOwnerName {
  value: string;
  constructor(value: string) {
    this.value = value.toUpperCase();
  }
}

export class TeamOwnerApplication {
  name: TeamOwnerName;
  id: string;
  password: string;
  email: string;
  emailVerified: boolean;
  updatedAt: Date;
  createdAt: Date;

  constructor(data: TeamOwnerApplicationObject) {
    const { name, password, email, createdAt, emailVerified, id, updatedAt } =
      data;
    this.name = new TeamOwnerName(name);
    this.password = password;
    this.email = email;
    this.emailVerified = emailVerified;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }

  static create(data: Omit<DTO, 'emailVerified'>): TeamOwnerApplication {
    const { email, name, password } = data;
    return new TeamOwnerApplication({
      email,
      name,
      password,
      createdAt: null,
      id: null,
      updatedAt: null,
      emailVerified: false,
    });
  }

  getEntity(): TeamOwnerApplicationObject {
    return {
      name: this.name.value,
      password: this.password,
      email: this.email,
      emailVerified: this.emailVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      id: this.id,
    };
  }

  getPresentation(): Omit<TeamOwnerApplicationObject, 'password'> {
    const { password, name, ...rest } = this;
    return { ...rest, name: this.name.value };
  }

  getDTO(): DTO {
    return {
      name: this.name.value,
      password: this.password,
      email: this.email,
      emailVerified: this.emailVerified,
    };
  }
}
