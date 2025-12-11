import { Eye, Clock } from "lucide-react";
import { ViewsProps } from "../types/rightPanel.types";

function Views({ views }: ViewsProps) {
    const BACKEND_APP_URL = import.meta.env.VITE_BACKEND_APP_URL;

    return (
        <div className="space-y-4">
            {views.map((view) => (
                <div key={view.id} className="bg-slate-600/50 rounded-xl pr-4">
                    <div className="flex items-center gap-3 rounded-l-xl">
                        <div className="w-14 h-14">
                            <img
                                src={`${BACKEND_APP_URL}/${view.avatar}` || "/placeholder.svg"}
                                alt={`${view.user_name} avatar`}
                                className="w-full h-full object-cover rounded-l-xl"
                            />
                        </div>
                        <div className="flex-1 p-1">
                            <h4 className="text-white font-medium">{view.user_name}</h4>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(view.view_time).toISOString().slice(0, 10)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-blue-400">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{view.visit_count}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Views;
