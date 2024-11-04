import { useState } from "react";
import { Heart, PawPrint, X } from "lucide-react";
import { Card } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { useGetTeamsQuery, useUpdateScoreTeamMutation } from "./services/apiService";

export default function Component() {
  const { data, error, isLoading } = useGetTeamsQuery();
  const [updateScoreTeam] = useUpdateScoreTeamMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);
  const [newPoints, setNewPoints] = useState(0);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los equipos: {error.toString()}</div>;

  const teams = data?.data ?? [];

  const openModal = (score) => {
    setSelectedScore(score);
    setNewPoints(score.points);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedScore(null);
  };

  const handleUpdatePoints = async () => {
    await updateScoreTeam({
      id: selectedScore.id,
      teamId: selectedScore.teamId,
      userId: selectedScore.user.id,
      points: newPoints,
    });
    closeModal();
  };

  return (
    <div className="min-h-screen bg-[#ffffff] relative p-4 sm:p-6 lg:p-8">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0c50 0 50 50 100 50S150 0 200 0v100c-50 0-50-50-100-50S50 100 0 100z' fill='%23FDF4FF' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="relative max-w-7xl mx-auto">
       
        <Card className="bg-purple-50/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl mb-6 shadow-lg">
          <div className="p-4 sm:p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1e0e2f] text-center">Teams</h1>
            <p className="text-center text-purple-600 mt-2 text-sm sm:text-base">Last update: 2 days ago</p>
          </div>
        </Card>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {teams.map((team) => {
            const totalPoints = team.score.reduce((sum, score) => sum + score.points, 0);
            
            return (
              <Card key={team.id} className="bg-purple-50/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1e0e2f]">{team.name}</h2>
                    {team.name === "DELTA" && <Heart className="text-purple-400 fill-purple-400" size={24} />}
                    {team.name === "ALFA" && <PawPrint className="text-purple-400" size={24} />}
                    {team.name === "GAMMA" && <span role="img" aria-label="dinosaur" className="text-2xl">🦖</span>}
                  </div>
                  
                  <div className="text-2xl sm:text-3xl font-bold text-[#1e0e2f] mb-4 sm:mb-6">
                    {totalPoints.toFixed(2)} USD
                  </div>

                  <div className="flex flex-col space-y-2 mb-4">
                    {team.score.length > 0 ? (
                      team.score.map((score, index) => (
                        <div key={score.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-xl sm:text-2xl font-bold text-[#1e0e2f] mr-2">{index + 1}</span>
                            <span className="text-base sm:text-xl font-bold text-[#1e0e2f]">
                              {score.user.name}
                            </span>
                          </div>
                          <span 
                            className="text-xl sm:text-2xl font-bold text-[#1e0e2f] mb-4 sm:mb-6 cursor-pointer hover:text-purple-600"
                            onClick={() => openModal(score)}
                          >
                            {score.points.toFixed(2)} USD
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-[#1e0e2f]">-</span>
                        <span className="text-base sm:text-xl text-[#1e0e2f]">Sin asignar</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["-1", "+1", "+5", "+10"].map((value) => (
                      <Button 
                        key={value}
                        variant="outline" 
                        className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 h-8 w-12 p-0 text-sm font-medium flex-grow sm:flex-grow-0"
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>


      {modalOpen && selectedScore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Actualizar Puntos</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <p className="mb-4">Puntos actuales de {selectedScore.user.name}: {selectedScore.points.toFixed(2)} USD</p>
            <input 
            type="text" 
            value={newPoints} 
            onChange={(e) => setNewPoints(e.target.value.replace(',', '.'))} 
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end">
              <Button onClick={handleUpdatePoints}>
                Actualizar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
