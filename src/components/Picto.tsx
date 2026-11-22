// Shows a built-in pictogram. Decorative: the text under the tile says what it is.
export function Picto({ id }: { id: string }) {
  return <img src={`${import.meta.env.BASE_URL}pictos/${id}.svg`} alt="" width={80} height={80} />
}
