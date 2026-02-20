'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/users/user.routes.js';
import publicationRoutes from '../src/publications/publication.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Path para poder trabajar con las rutas
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            publications: '/api/publications',
        }

        //Conectas a la base de datos
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    //Definición de rutas
    routes() {
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.publications, publicationRoutes);
    }

    //Método para escuchar el servidor
    //Si falla dara otro mensaje
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export default Server;