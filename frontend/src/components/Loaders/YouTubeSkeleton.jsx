export default function YouTubeSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="overflow-hidden rounded-[2rem] bg-slate-800 p-4 shadow-2xl shadow-slate-950/30">
          <div className="mb-4 h-40 rounded-3xl bg-slate-700 animate-pulse" />
          <div className="space-y-3">
            <div className="h-5 w-3/4 rounded-full bg-slate-700 animate-pulse" />
            <div className="h-4 w-full rounded-full bg-slate-700 animate-pulse" />
            <div className="h-4 w-5/6 rounded-full bg-slate-700 animate-pulse" />
          </div>
        </div>
      ))}
    </>
  )
}
