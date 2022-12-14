import React, { useState, useEffect } from 'react'
import classes from './Success.module.css'
import { FaCheck } from 'react-icons/fa'
import { booksApi } from '../../store/services'
import { useNavigate } from 'react-router-dom'

const Success = props => {

    // eslint-disable-next-line
    const [addOrder, response] = booksApi.useAddOrderMutation()
    // eslint-disable-next-line
    const { data, error, isLoading } = booksApi.useGetCartQuery()
    const [removeFromCart] = booksApi.useRemoveFromCartMutation()
    const [cart, setCart] = useState()
    useEffect(() => {
        if (data) {
            setCart(data)
        }
    }, [data]);

    let navigate = useNavigate()

    useEffect(() => {

        if (cart) {
            let items = []

            cart.cart.bookItems.forEach((book) => {
                items.push(book._id)
            })
            cart.cart.collectionItems.forEach((item) => {
                item.collectionBooks.forEach((book) => {
                    items.push(book)
                })
            })
            let order = { bookIds: items, totalFinalPrice: cart.finalPrice }
            let bookIds = []
            cart.cart.bookItems.forEach((book) => {
                bookIds.push(book._id)
            })

            let collectionIds = []
            cart.cart.collectionItems.forEach((book) => {
                collectionIds.push(book._id)
            })
            addOrder(order).then((r) => {
                removeFromCart({ bookIds: bookIds, collectionIds: collectionIds }).then((re) => {
                    navigate('/profile/bookshelf')
                })

            }).catch((err) => { console.log(err) })

        }

    }, [cart])





    return (
        <div className={`col-12`}>
            <div className={classes.successCard}>
                <div className={classes.cardHeader}>
                    <div className={classes.Icon}>
                        <p><FaCheck /></p>
                    </div>
                </div>
                <div className={classes.cardDesc}>
                    <h2>Great!</h2>
                    <h6>Checkout Completed Successfully</h6>
                    <div className={classes.action}>
                        <button >Go to Shelf</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Success;