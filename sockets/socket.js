const {io}=require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');
const bands= new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Linkin Park'));
bands.addBand(new Band('Slikntop'));
bands.addBand(new Band('Metallica'));
console.log(bands);

// Mensajes de Sockets 
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.emit('bandas-act',bands.getBands());
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });
     client.on('mensaje',( payload )=> {
        console.log('escuchamos el mensaje: ', payload);
     
        io.emit('mensaje', { admin:' Nuevo mensaje'});
     });
     client.on('emitir-nuevo-mensaje', ( payload )=> {
      console.log('emitir-nuevo-mensaje: ', payload);
       //  io.emit('nuevo-mensaje', payload); // se emite a todo los clientes conectador
         client.broadcast.emit('nuevo-mensaje', payload); // se emite a todo los clientes conectador menos al cliente que lo emite
     });
     client.on('vote-bans',( payload )=> {
      bands.voteBand(payload.id);
      io.emit('bandas-act',bands.getBands());
      // console.log('vote-bans', payload); 
   });
   client.on('add-band',( payload )=> {
      bands.addBand(new Band( payload.name));
      io.emit('bandas-act',bands.getBands());
      // console.log('vote-bans', payload); 
   });
   client.on('delete-banda',( payload )=> {
      bands.deleteBand(payload.id);

      io.emit('bandas-act',bands.getBands());
      // console.log('vote-bans', payload); delete-banda
   });
   client.on('update-banda',( payload )=> {
      bands.updateBand(payload.id, new Band(payload.name,payload.votes,payload.id));

      io.emit('bandas-act',bands.getBands());
      // console.log('vote-bans', payload); delete-banda
   });
  });