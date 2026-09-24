7. Preguntas para pensar (cierre de clase)
1 Orden: ¿qué pasaría si SanitizeInterceptor se registrara antes que TransformInterceptor? ¿Seguiría limpiando los datos?


2 Timeout: cuando se dispara el 408, ¿el setTimeout de 4.5 s del servicio se cancela de verdad, o solo dejamos de esperarlo? ¿Qué implicaría eso con una consulta real a una base de datos?


3 Logging: ¿por qué con tap(() => ...) las peticiones que fallan no se loguean? ¿Qué alternativa ofrece tap({ next, error }) o finalize()?


4 Sanitize vs. DTOs de salida: ocultar datos con un interceptor es una red de seguridad. ¿Qué otra estrategia existe (pista: class-transformer con @Exclude() y ClassSerializerInterceptor)? ¿Cuál preferirían en producción y por qué?

El interceptor sirve como seguridad para evitar que se envien datos sensibles, pero tambien se puede usar class-transformer con @Exclude() y ClassSerializerInterceptor para controlar que campos se muestran. En produccion creo que usaria los DTOs y class-transformer para definir claramente que datos puede recibir el cliente, y dejaría el interceptor como una seguridad adicional


5 Swagger: la documentación dice que GET /orders/1 devuelve un Order, pero en realidad el cliente recibe { statusCode, timestamp, path, data: Order }. ¿Cómo lo documentarían bien?