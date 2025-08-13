import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid"

const KPICard = ({ title, value, unit, trend, trendValue, icon: Icon, color = "primary" }) => {
  const colorClasses = {
    primary: "from-blue-500 to-purple-600",
    green: "from-green-500 to-emerald-600",
    blue: "from-blue-500 to-cyan-600",
    orange: "from-orange-500 to-red-500",
    red: "from-red-500 to-pink-600",
  }

  const iconBgClasses = {
    primary: "bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-blue-600",
    green: "bg-gradient-to-br from-green-500/20 to-emerald-600/20 text-green-600",
    blue: "bg-gradient-to-br from-blue-500/20 to-cyan-600/20 text-blue-600",
    orange: "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-600",
    red: "bg-gradient-to-br from-red-500/20 to-pink-600/20 text-red-600",
  }

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      ></div>

      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">{value}</p>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          {trend && (
            <div className="flex items-center mt-3">
              <div className={`p-1 rounded-full ${trend === "up" ? "bg-green-100" : "bg-red-100"}`}>
                {trend === "up" ? (
                  <ArrowUpIcon className="w-3 h-3 text-green-600" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3 text-red-600" />
                )}
              </div>
              <span className={`text-sm ml-2 font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={`p-4 rounded-xl ${iconBgClasses[color]} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-8 h-8" />
          </div>
        )}
      </div>
    </div>
  )
}

export default KPICard
