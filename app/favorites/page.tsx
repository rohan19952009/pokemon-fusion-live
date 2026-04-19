export default function FavoritesPage() {
  return (
    <div className="container py-12 max-w-4xl space-y-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-extrabold mb-4">Your Favorites</h1>
      
      <div className="w-full flex-1 min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-card/20 p-8">
        <h2 className="text-2xl font-bold text-muted-foreground mb-2">No favorites yet!</h2>
        <p className="text-muted-foreground max-w-md">
          Once you start generating fusions, you can save your favorites here. 
          Currently syncing is under construction for the D1 database binding.
        </p>
      </div>
    </div>
  );
}
