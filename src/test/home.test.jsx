import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Home } from '../pages/home'
import axios from 'axios'

jest.mock('axios')

const mockSetPokemonData = jest.fn()

describe('Home component', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes('pokemon?limit=')) {
        return Promise.resolve({
          data: {
            results: [
              { url: 'https://pokeapi.co/api/v2/pokemon/1' }
            ]
          }
        })
      }

      return Promise.resolve({
        data: {
          name: 'bulbasaur',
          id: 1,
          types: [{ type: { name: 'grass' } }],
          sprites: { front_default: 'bulbasaur.png' },
        }
      })
    })

    axios.all = jest.fn().mockResolvedValue([
      {
        data: {
          name: 'bulbasaur',
          id: 1,
          types: [{ type: { name: 'grass' } }],
          sprites: { front_default: 'bulbasaur.png' },
        },
      },
    ])
  })

  it('deve renderizar o skeleton inicialmente', async () => {
    render(
      <BrowserRouter>
        <Home setpokemonData={mockSetPokemonData} />
      </BrowserRouter>
    )

    const skeletons = await screen.findAllByTestId('pokemon-skeleton')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('deve mostrar as Pokemons Cards depois de carregar', async () => {
    render(
      <BrowserRouter>
        <Home setpokemonData={mockSetPokemonData} />
      </BrowserRouter>
    )

    const card = await screen.findByText(/bulbasaur/i)
    expect(card).toBeInTheDocument()
  })

  it('deve chamar setPage ao clicar no botão próximo', async () => {
    render(
      <BrowserRouter>
        <Home setpokemonData={mockSetPokemonData} />
      </BrowserRouter>
    )

    const nextButton = await screen.findByRole('button', { name: /próxima/i })
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(nextButton).toBeInTheDocument()
    })
  })
})


