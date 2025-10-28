import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { timeline } from "@/data/battles";

interface TimelineProps {
  onSelectBattle: (battleId: string) => void;
}

export function Timeline({ onSelectBattle }: TimelineProps) {
  return (
    <Card className="hip-hop-card mx-4">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-2xl sm:text-3xl street-title text-center">
          <span className="graffiti-text">CHRONOLOGIE DES BATTLES</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={item.id} className="battle-timeline-item">
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40 font-bold text-xs sm:text-sm w-fit">
                  <Calendar className="w-3 h-3 mr-1" />
                  {item.year}
                </Badge>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-base sm:text-lg text-yellow-400 street-title leading-tight">{item.title.toUpperCase()}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed urban-subtitle">
                    {item.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSelectBattle(item.id)}
                    className="mt-2 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black font-bold text-xs sm:text-sm w-full sm:w-auto"
                  >
                    VOIR LES DÉTAILS
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}