import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  // Inyecta una instancia de PrismaService para acceder a la base de datos
  constructor(private prisma: PrismaService) {}

  // Retorna una promesa que contiene un array con todos los registros de tipo "Task" en la base de datos
  async getAllTask(): Promise<Task[]> {
    return this.prisma.task.findMany(); //.findMany() sirve para retornar todos los registros de la tabla indicada, en este caso de "task"
  }

  // Retorna un registro único de tipo "Task" basado en el ID
  async getTaskById(ID: number): Promise<Task> {
    return this.prisma.task.findUnique({
      where: { id: ID },
    }); // .findUnique() busca un solo registro según la condición en "where"
  }

  // Crea una nueva tarea con base a los parametros pasados
  async createTask(TITLE: string, DES: string): Promise<string> {
    //Se le pasa el titulo y la descripcion
    await this.prisma.task.create({
      //Con el metodo .create, crea una nueva tupla en la bd
      data: {
        // Con ayuda de el objeto data, dentro de este, van los campos de la tabla a la que quieres insertar datos y sus respectivos valores
        title: TITLE,
        description: DES,
      },
    });
    return `Se ha creado una tupla con el titulo de ${TITLE}.`;
  }

  //Elimina la tupla con el ID que ingreses
  async deleteTask(ID: number): Promise<string> {
    //Intenta eliminar la tupla
    try {
      await this.prisma.task.delete({
        where: { id: ID }, //Elimina la tupla que coincida con el id ingresado
      });
      return `La tupla con el ID ${ID} se ha eliminado.`;
      //Si el ID no existe u ocurre algun error, entra el catch
    } catch (error) {
      return `No se pudo encontrar una tarea con el ID ${ID}.`;
    }
  }

    //Actualiza la tupla con el ID, y los datos que ingreses
  async updateTask(ID: number, task: Task): Promise<string> {
    try {
      await this.prisma.task.update({ //Update es el metodo que se utiliza para actualizar una tupla, con las propiedades where, para indicar que tupla se va a actualizar, y data, para indicar los valores por los que se van a cambiar
        where: { id: ID },
        data: {
          title: task.title,
          description: task.description,
        },
      });
    } catch (error) {
      return `No se pudo encontrar una tarea con el ID ${ID}.`;
    }
    return `Se ha actualizado la tupla con ID de ${ID}.`;
  }
}
