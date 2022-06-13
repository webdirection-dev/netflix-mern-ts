import {Request, Response} from 'express'

const router = require('express').Router()

const verify = require('../verifyToken')
const Movie = require('../models/Movie')

interface IMovies extends Request{
    user: {
        id: string,
        isAdmin: boolean,
        iat: number,
        exp: number
    }
}

//CREATE
router.post(
    '/',
    verify, // middleware
    async (req: IMovies, res: Response) => {
        if (req.user.isAdmin) {
            const newMovie = new Movie(req.body)

            try {
                const savedMovie = await newMovie.save()
                return res.status(201).json(savedMovie)
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json('Yoy are not allowed!')
        }
    }
)

//UPDATE
router.put(
    '/:id',
    verify, // middleware
    async (req: IMovies, res: Response) => {
        if (req.user.isAdmin) {
            try {
                const updatedMovie = await Movie.findByIdAndUpdate(
                    req.params.id,
                    {$set: req.body},
                    {new: true}
                )

                return res.status(200).json(updatedMovie)
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json('Yoy are not allowed!')
        }
    }
)

//DELETE
router.delete(
    '/:id',
    verify, // middleware
    async (req: IMovies, res: Response) => {
        if (req.user.isAdmin) {
            try {
                await Movie.findByIdAndDelete(req.params.id)
                return res.status(200).json('The movie has been deleted...')
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json('Yoy are not allowed!')
        }
    }
)

//GET
router.get(
    '/find/:id',
    verify, // middleware
    async (req: Request, res: Response) => {
        try {
            const movie = await Movie.findById(req.params.id)
            return res.status(200).json(movie)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

//GET ALL MOVIES
router.get(
    '/',
    verify, // middleware
    async (req: IMovies, res: Response) => {
        if (req.user.isAdmin) {
            try {
                const movies = await Movie.find()
                return res.status(200).json(movies.reverse())
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json('Yoy are not allowed!')
        }
    }
)

//GET RANDOM MOVIE
router.get(
    '/random',
    verify, // middleware
    async (req: Request, res: Response) => {
        const type = req.query.type // for example /random?type=series
        let movie = ''

        try {
            if (type === 'series') {
                movie = await Movie.aggregate([
                    {$match: {isSeries: true}},
                    {$sample: {size: 1}}, //колличество найденных элементов
                ])
            } else {
                movie = await Movie.aggregate([
                    {$match: {isSeries: false}},
                    {$sample: {size: 1}}, //колличество найденных элементов
                ])
            }

            return res.status(200).json(movie)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

module.exports = router