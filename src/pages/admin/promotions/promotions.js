import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { booksApi } from '../../../store/services'

const PromotionsAdmin = () => {

  // eslint-disable-next-line
  const { data, isLoading, error } = booksApi.useGetAllPromotionsQuery()
  const [promotions, setAllpromotions] = useState()
  // eslint-disable-next-line
  const [deletePromotion, response] = booksApi.useDeletePromotionMutation()

  useEffect(() => {
    if (data) {
      setAllpromotions(data)
    }
  }, [data]);


  const deleteItem = (id) => {
    deletePromotion(id).then((response) => console.log(response)).catch((error) => console.log(error))
  }

  return (
    <div className="page-body-wrapper p-5" style={{flex:"auto"}}>
      <div className="content-wrapper pt-5">
        <table className="table">
          <thead className="text-secondary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">title</th>
              <th scope="col">description</th>
              <th scope="col">discount_rate</th>
              <th scope="col">start_date</th>
              <th scope="col">end_date</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className='text-white'>

            {promotions !== undefined ? promotions.map((pormotion, i) => {
              return (
                <tr key={pormotion._id}>
                  <td >{i + 1}</td>
                  <td >{pormotion.title}</td>
                  <td >{pormotion.description}</td>
                  <td >{pormotion.discount_rate * 100} %</td>
                  <td >{pormotion.start_date}</td>
                  <td >{pormotion.end_date}</td>
                  <td ><Link to={'/admin/promotion/updatePromotion/' + pormotion._id} className="btn btn-primary" >Update</Link></td>
                  <td ><button className="btn btn-danger" onClick={(e) => deleteItem(pormotion._id)} >Delete</button></td>
                </tr>
              )
            })
              :
              null
            }

          </tbody>
        </table>
        <Link to={'/admin/promotion/addPromotion'} className="btn btn-primary text-white" >Add New Promotion</Link>
      </div>
    </div>
  )
}

export default PromotionsAdmin