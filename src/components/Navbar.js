import React, {Component } from 'react'
import s from "styled-components"
import Logo from "../images/PCVPrizeSparkTeen.jpg"
import { STEEL_BLUE, MIDNIGHT_BLUE, GREEN } from "../utils/constants"
import {navLinks, smLinks} from "../data/navigation"

const NavWrapper = s.nav`
  background-color: white;
  height: 80px;
  width: 100%;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 100;

  @media screen and (min-width: 1200px) {
    position: static;
  }
`

const NavBrand = s.a`
`

const NavBrandImg = s.img`
  padding-left: 10px;
  height: 60px;
  width: auto;
`

const ToggleMenuButton = s.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: end;
  justify-content: center;
  flex-direction: column;
  
  &:hover > *, &:focus > * {
    background-color: ${STEEL_BLUE};
  }
  
  @media screen and (min-width: 1200px) {
    display: none;
  }
`

const IconBar = s.span`
  background-color: ${MIDNIGHT_BLUE};
  height: 2px;
  width: 25px;
  margin: 3px;
  display: block;
  transition: all 0.3s;
`

const NavOverlay = s.div`
  position: fixed;
  top: 75px;
  right: 0;
  bottom: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  visibility: hidden;
`

export const NavMenu = s.div`
  position: fixed;
  top: 75px;
  right: 0;
  bottom: 0;
  left: 100%;
  transition: all 0.3s ease-in-out;
  visibility: hidden;
  
  @media screen and (min-width: 1200px) {
    all: unset;
    position: static;
    display: flex;
    height: 100%;
  }
`

const NavLinks = s.div`
  background-color: transparent;
  max-height: 0;
  overflow: hidden;
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media screen and (min-width: 1200px) {
    all: unset;
    display: flex;
    flex-direction: row;
    max-height: max-content;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 0;
    margin: 0 30px;
  }
`

export const NavButton = s.a`
  font-family: roboto;
  color: black;
  font-weight: 600;
  margin: 10px 10px;
  cursor: pointer;
  display: flex;
  flex-basis: content;
  width: max-content;
  transition: 0.2s;
  
  &:hover {
    color: ${STEEL_BLUE};
  }
  
  @media screen and (min-width: 1200px) {
    margin: auto 10px;
    height: 100%;
    align-items: center;
  }
`

const isBrowser = typeof window !== "undefined"

export class Navbar extends Component {
  state = {
    opened: false
  }

  handleMenuClose = () => {
    this.setState({
      opened: false
    })
    this.getOpened()
  }
  handleMenuToggle = () => {
    this.setState({
      opened: !this.state.opened
    })
    this.getOpened()
  }

  getOpened = () => {
    return this.state.opened
  }


  render() {
    // close navbar when window closes
    if (isBrowser) {
      window.addEventListener('resize', this.handleMenuClose)
    }

    // for animating menu icon bars toggling
    const firstIconBarStyle = {
      marginBottom: '-5px',
      marginRight: '-2px',
      transform: 'rotate(-45deg)'
    }
    const secondIconBarStyle = {
      opacity: '0'
    }
    const thirdIconBarStyle = {
      marginTop: '-5px',
      marginRight: '-2px',
      transform: 'rotate(45deg)'
    }

    // styles for when the nav menu is opened in mobile mode
    const navMenuOpenedStyle = {
      backgroundColor: 'white',
      left: '60%',
      opacity: '1',
      visibility: 'visible',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '30px',
      paddingBottom: '30px'
    }
    const navOverlayOpenedStyle = {
      backgroundColor: 'rgb(0, 0, 0)',
      opacity: '0.3',
      visibility: 'visible'
    }
    const navLinksOpenedStyle = {
      padding: '1em',
      maxHeight: 'none',
      top: '0'
    }
    const navIconsOpenedStyle = {
      padding: '1em',
      maxHeight: 'none',
      bottom: '0',
      display: 'flex',
      flexDirection: 'row'
    }

    return (
      <nav css={`margin-top: 20px`}>
        <NavWrapper>
          <NavBrand rel="noreferrer noopener" href='/'>
            <NavBrandImg src={Logo}/>
          </NavBrand>
          <ToggleMenuButton onClick={this.handleMenuToggle}>
            <IconBar style={this.getOpened() ? firstIconBarStyle : null}/>
            <IconBar style={this.getOpened() ? secondIconBarStyle : null}/>
            <IconBar style={this.getOpened() ? thirdIconBarStyle : null}/>
          </ToggleMenuButton>
          <NavOverlay onClick={this.handleMenuClose}
                      style={this.getOpened() ? navOverlayOpenedStyle : null}/>
          <NavMenu style={this.getOpened() ? navMenuOpenedStyle : null}>
            <NavLinks style={this.getOpened() ? navLinksOpenedStyle : null}>
              { navLinks.map( navLink => (
                <NavButton rel="noreferrer noopener" href={navLink.url} >
                  {navLink.linkName}
                </NavButton>
              )) }
            </NavLinks>
            <NavLinks style={this.getOpened() ? navIconsOpenedStyle : null}>
              { smLinks.map( smLink => (
                <NavButton target="_blank" rel="noreferrer noopener" href={smLink.url} >
                  {smLink.icon}
                </NavButton>
              )) }
            </NavLinks>
          </NavMenu>
        </NavWrapper>
      </nav>
    )
  }
}