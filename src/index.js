import React from 'react'
import { render } from 'react-dom'
import  routes  from './routes'
import './stylesheets/normalize.css'
import './stylesheets/ui.scss'
import { App } from './components/App'

window.React = React

render(<App />,  document.getElementById('react-container'))
