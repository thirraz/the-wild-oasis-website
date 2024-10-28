import { unstable_noStore as noStore } from "next/cache"
import CabinCard from "@/app/_components/CabinCard"
import { getCabins } from "@/app/_lib/data-service"

export default async function CabinList({ filter }) {
	noStore()

	const cabins = await getCabins()

	if (!cabins.length) return null

	let displayedCabins
	switch (filter) {
		case "all":
			displayedCabins = cabins
			break
		case "small":
			displayedCabins = cabins.filter(cabin => cabin.maxCapacity <= 3)
			break
		case "medium":
			displayedCabins = cabins.filter(
				cabin => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7
			)
			break
		case "large":
			displayedCabins = cabins.filter(cabin => cabin.maxCapacity > 7)
			break
	}

	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
			{displayedCabins.map(cabin => (
				<CabinCard cabin={cabin} key={cabin.id} />
			))}
		</div>
	)
}
