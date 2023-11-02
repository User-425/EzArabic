ezArabicVersion = "2.5.1 (Github Release)";
legacy_mode = "0";

// Add version to HTML
vrstext = document.getElementById( 'vrs' );
vrstext.innerHTML = "v".concat( ezArabicVersion )

// Auto Scroller
function textScroller( id , scrl) {
  if (scrl==true) {
    var area = document.getElementById( id )
    area.scrollTop = area.scrollHeight;
  }
}

$( '#slider' )  
  .on( 'input', e => $( '#output' )
    .css( 'font-size', $( e.target )
      .val() + 'px' ) );

// Copy Function
function copy( id, inVal ) {
  var copyText = document.getElementById( id );
  if ( inVal == "in" ) {
    navigator.clipboard.writeText( copyText.innerHTML );
  } else {
    copyText.select();
    copyText.setSelectionRange( 0, 99999 );
    navigator.clipboard.writeText( copyText.value );
  }

  x = document.getElementById( 'myalert' );
  x.classList.add( 'show' )
  document.querySelectorAll( '.js-alert' )
    .forEach( function( $el ) {
      setTimeout( () => {
        $el.classList.remove( 'show' );
      }, 1500 );
    } );
}

// Table click feature (copy or input)

function press( id, inVal ) {
  table_f = document.getElementById( "tablefeature" ).value;
  if ( table_f == "copy" ) {
    copy( id, inVal )
  } else {
    t_value = document.getElementById( id );
    console.log(t_value)
    if ( inVal == "in" ) {
      addTextAtCaret('input',t_value.innerHTML);
    } else {
      addTextAtCaret('input',t_value.value);
    }
  }
};

function clone( obj ) {
  // Handle the 3 simple types, and null or undefined
  if ( null == obj || "object" != typeof obj ) return obj;

  // Handle Date
  if ( obj instanceof Date ) {
    var copy = new Date();
    copy.setTime( obj.getTime() );
    return copy;
  }

  // Handle Array
  if ( obj instanceof Array ) {
    var copy = [];
    for ( var i = 0, len = obj.length; i < len; i++ ) {
      copy[ i ] = clone( obj[ i ] );
    }
    return copy;
  }

  // Handle Object
  if ( obj instanceof Object ) {
    var copy = {};
    for ( var attr in obj ) {
      if ( obj.hasOwnProperty( attr ) ) copy[ attr ] = clone( obj[ attr ] );
    }
    return copy;
  }

  throw new Error( "Unable to copy obj! Its type isn't supported." );
}

( function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = ( el, all = false ) => {
    el = el.trim()
    if ( all ) {
      return [ ...document.querySelectorAll( el ) ]
    } else {
      return document.querySelector( el )
    }
  }

  /**
   * Easy event listener function
   */
  const on = ( type, el, listener, all = false ) => {
    let selectEl = select( el, all )
    if ( selectEl ) {
      if ( all ) {
        selectEl.forEach( e => e.addEventListener( type, listener ) )
      } else {
        selectEl.addEventListener( type, listener )
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = ( el, listener ) => {
    el.addEventListener( 'scroll', listener )
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select( '#navbar .scrollto', true )
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach( navbarlink => {
      if ( !navbarlink.hash ) return
      let section = select( navbarlink.hash )
      if ( !section ) return
      if ( position >= section.offsetTop && position <= ( section.offsetTop + section.offsetHeight ) ) {
        navbarlink.classList.add( 'active' )
      } else {
        navbarlink.classList.remove( 'active' )
      }
    } )
  }
  window.addEventListener( 'load', navbarlinksActive )
  onscroll( document, navbarlinksActive )

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = ( el ) => {
    let header = select( '#header' )
    let offset = header.offsetHeight

    if ( !header.classList.contains( 'header-scrolled' ) ) {
      offset -= 20
    }

    let elementPos = select( el )
      .offsetTop
    window.scrollTo( {
      top: elementPos - offset,
      behavior: 'smooth'
    } )
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select( '#header' )
  if ( selectHeader ) {
    const headerScrolled = () => {
      if ( window.scrollY > 100 ) {
        selectHeader.classList.add( 'header-scrolled' )
      } else {
        selectHeader.classList.remove( 'header-scrolled' )
      }
    }
    window.addEventListener( 'load', headerScrolled )
    onscroll( document, headerScrolled )
  }

  /**
   * Back to top button
   */
  let backtotop = select( '.back-to-top' )
  if ( backtotop ) {
    const toggleBacktotop = () => {
      if ( window.scrollY > 100 ) {
        backtotop.classList.add( 'active' )
      } else {
        backtotop.classList.remove( 'active' )
      }
    }
    window.addEventListener( 'load', toggleBacktotop )
    onscroll( document, toggleBacktotop )
  }

  /**
   * Mobile nav toggle
   */
  on( 'click', '.mobile-nav-toggle', function( e ) {
    select( '#navbar' )
      .classList.toggle( 'navbar-mobile' )
    this.classList.toggle( 'bi-list' )
    this.classList.toggle( 'bi-x' )
  } )

  /**
   * Mobile nav dropdowns activate
   */
  on( 'click', '.navbar .dropdown > a', function( e ) {
    if ( select( '#navbar' )
      .classList.contains( 'navbar-mobile' ) ) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle( 'dropdown-active' )
    }
  }, true )

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on( 'click', '.scrollto', function( e ) {
    if ( select( this.hash ) ) {
      e.preventDefault()

      let navbar = select( '#navbar' )
      if ( navbar.classList.contains( 'navbar-mobile' ) ) {
        navbar.classList.remove( 'navbar-mobile' )
        let navbarToggle = select( '.mobile-nav-toggle' )
        navbarToggle.classList.toggle( 'bi-list' )
        navbarToggle.classList.toggle( 'bi-x' )
      }
      scrollto( this.hash )
    }
  }, true )

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener( 'load', () => {
    if ( window.location.hash ) {
      if ( select( window.location.hash ) ) {
        scrollto( window.location.hash )
      }
    }
  } );
} )()
