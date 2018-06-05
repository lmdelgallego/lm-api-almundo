import _ from 'lodash';
import { success, notFound } from '../../services/response/'
import dataHotel from '../../data.json'
import { Hotel } from '.'

export const create = ({ body }, res, next) =>
  Hotel.child(body.id).set(body)
  .then(() => { return {message: 'Hotel successfully added!', data: body}})
  .then(success(res))
  .then(next)

export const index = (res, next) =>
  Hotel.orderByChild('id').once('value')
  .then( snapshot => _.orderBy(snapshot.val(), ['name'], ['asc'] ))
  .then(success(next))
  .catch(next)

export const query = (req, res, next) => {
  if(req.query['name']){
    Hotel.once('value')
    .then( snapshot => {
      const hotelList = snapshot.val();
      return _.filter(hotelList, function(value) {
        if(!_.isUndefined(value)){
          return _.includes( _.toLower(value.name),  _.toLower(req.query['name']))
        }
      })
    })
    .then(success(res))
    .catch(next)
  }else if(req.query['stars']){
    console.log("Buscando por estrellas", req.query['stars']);
    Hotel.once('value')
    .then( snapshot => {
      const hotelList = snapshot.val();
      return _.filter(hotelList, function(value) {
        if(!_.isUndefined(value)){
          return _.includes( req.query['stars'], value.stars )
        }
      })
    })
    .then(success(res))
    .catch(next)
  }else{
    next();
  }
}


export const show = ({ params }, res, next) =>
  Hotel.once('value')
  .then( snapshot => {
    const hotel = _.find(snapshot.val(), {"id" : parseInt(params.id)});
    if(hotel){
      return hotel
    } else {
      notFound(res);
    }
  })
  .then( success(res) )
  .catch( next)


export const update = ({params, body},res, next) =>
  Hotel.once('value')
  .then( snapshot => {
    const hotel = _.find(snapshot.val(), {"id" : parseInt(params.id)});
    if(hotel){
      return { hotel , index: _.findIndex(snapshot.val(),{ 'id': hotel.id } ) }
    } else {
      notFound(res);
    }
  })
  .then( (objHotel) =>
    Hotel.child(objHotel.index).update(body)
    .then(() => { return {message: 'Hotel successfully updated!', data: body}})
    .then(success(res))
  )
  .catch( next)

export const destroy = ({params}, res, next ) =>
  Hotel.once('value')
  .then( snapshot => {
    const hotel = _.find(snapshot.val(), {"id" : parseInt(params.id)})
    if(hotel){
      return { hotel , index: _.findIndex(snapshot.val(),{ 'id': hotel.id } ) }
    } else {
      notFound(res);
    }
  })
  .then( (objHotel ) =>
    Hotel.child(objHotel.index).remove()
    .then(() => { return {message: 'Hotel successfully deleted!', id: params.id}})
    .then(success(res))
  )
  .catch(next)
