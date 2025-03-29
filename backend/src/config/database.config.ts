
import { Logger, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot("mongodb+srv://suman:1tCeXHXmmYkgspt5@cluster0.bgh6m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            connectionFactory: (connection) => {
                connection.on('connected', () => Logger.log('✅ MongoDB Connected', 'MongoDB'));
                connection.on('error', (err) => Logger.error('❌ MongoDB Connection Error', err, 'MongoDB'));
                connection.on('disconnected', () => Logger.warn('⚠️ MongoDB Disconnected', 'MongoDB'));
                return connection;
            }
        })
    ]
})

export class DatabaseModule{ };