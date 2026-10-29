import "reflect-metadata";
import { DataSource } from "typeorm";
import { ambiente } from "./ambiente";
import { Usuario } from "../entidades/usuario";
import { Cliente } from "../entidades/cliente";
import { Item } from "../entidades/item";
import { Plano } from "../entidades/plano";
import { Evento } from "../entidades/evento";

export const fonteDeDados = new DataSource({
  type: "mysql",
  host: ambiente.banco.host,
  port: ambiente.banco.porta,
  username: ambiente.banco.usuario,
  password: ambiente.banco.senha,
  database: ambiente.banco.nome,

  supportBigNumbers: true,
  bigNumberStrings: false,
  entities: [Usuario, Cliente, Item, Plano, Evento],

  synchronize: false,
});