import {expect} from 'chai';
import {List, Map} from 'immutable';
import {setEntries, next, vote} from '../src/core';

describe('immutability', () => {
    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }
        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);
            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('A List', () => {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }
        it('is immutable', () => {
            let state = List.of('Trainspotting', '28 Days Later');
            let nextState = addMovie(state, 'Sunshine');
            expect(nextState).to.equal(List.of(
            'Trainspotting',
            '28 Days Later',
            'Sunshine'
            ));
            expect(state).to.equal(List.of(
            'Trainspotting',
            '28 Days Later'
            ));
        });
    });

    describe('a tree', () => {
        
        // function addMovie(currentState, movie) {
        //     return currentState.set(
        //     'movies',
        //     currentState.get('movies').push(movie)
        //     );
        // }

        function addMovie(currentState, movie) {
            return currentState.update('movies', movies => movies.push(movie));
          }

        it('is immutable', () => {
            let state = Map({
            movies: List.of('Trainspotting', '28 Days Later')
            });
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(Map({
            movies: List.of(
                'Trainspotting',
                '28 Days Later',
                'Sunshine'
            )
            }));
            expect(state).to.equal(Map({
            movies: List.of(
                'Trainspotting',
                '28 Days Later'
            )
            }));
        });

    });
});

describe('application logic', () => {

    describe('vote', () => {
        it('создаёт результат голосования для выбранной записи', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List()
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                    'Trainspotting': 1
                    })
                }),
                entries: List()
            }));
        });
    
        it('добавляет в уже имеющийся результат для выбранной записи', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                    'Trainspotting': 4,
                    '28 Days Later': 2
                    })
                }),
                entries: List()
            }));
        });
    });
});