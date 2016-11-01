import { DivIcon, marker } from 'leaflet'
import { render } from 'react-dom';
import { Children, PropTypes } from 'react'
import { MapLayer } from 'react-leaflet';
import './index.css';

export default class Marker extends MapLayer {
  static propTypes = {
    opacity: PropTypes.number,
    position: PropTypes.array,
    zIndexOffset: PropTypes.number,
  };

  static childContextTypes = {
    popupContainer: PropTypes.object,
  };

  getChildContext () {
    return {
      popupContainer: this.leafletElement,
    }
  }

  componentWillMount () {
    super.componentWillMount()
    const { position, ...props } = this.props
    this.icon = new DivIcon(props);
    this.leafletElement = marker(position, { icon: this.icon, ...props })
  }

  componentDidMount() {
    super.componentDidMount();
    this.renderContent();
  }

  componentDidUpdate (prevProps: Object) {
    this.renderContent();
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setLatLng(this.props.position)
    }
    if (this.props.icon !== prevProps.icon) {
      this.leafletElement.setIcon(this.props.icon)
    }
    if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(this.props.zIndexOffset)
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(this.props.opacity)
    }
    if (this.props.draggable !== prevProps.draggable) {
      if (this.props.draggable) {
        this.leafletElement.dragging.enable()
      } else {
        this.leafletElement.dragging.disable()
      }
    }
  }

  renderContent() {
    const container = this.leafletElement._icon;
    if (container && this.props.children) {
      render(
        Children.only(this.props.children),
        container
      );
    }
  }

  render () {
    this.renderContent();
    return null
  }
}
