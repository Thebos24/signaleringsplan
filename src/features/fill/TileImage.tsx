import { Picto } from '../../components/Picto'
import type { ImageRef } from '../../domain/plan'
import { PhotoImage } from '../photo/PhotoImage'

// The picture of a stored tile: a built-in pictogram or a stored photo
export function TileImage({ image }: { image: ImageRef }) {
  return image.type === 'picto' ? (
    <Picto id={image.pictoId} />
  ) : (
    <PhotoImage photoId={image.photoId} />
  )
}
