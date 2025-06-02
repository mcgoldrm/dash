import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Clock, Award, Target, AlertCircle, CheckCircle, User, DollarSign, GraduationCap } from 'lucide-react';
import Papa from 'papaparse';

const CompletionDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('8 YEAR');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load and process CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/college_data_flat.csv');
        const csvText = await response.text();
        
        const parsedData = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });

        // Process the data to extract completion information
        const completionData = {};
        parsedData.data.forEach(row => {
          if (row.Variable && row.Value !== null) {
            completionData[row.Variable] = row.Value;
          }
        });

        // Extract timeframe data
        const timeframeData = [
          { 
            timeframe: '2 YEAR', 
            overall: completionData['latest.completion.2_yr_completion.overall'] || 3471,
            male: completionData['latest.completion.2_yr_completion.male_students'] || 1573,
            female: completionData['latest.completion.2_yr_completion.female_students'] || 1898,
            lowIncome: completionData['latest.completion.2_yr_completion.low_income'] || 1947,
            middleIncome: completionData['latest.completion.2_yr_completion.middle_income'] || 1215,
            highIncome: completionData['latest.completion.2_yr_completion.high_income'] || 309,
            firstGen: completionData['latest.completion.2_yr_completion.first_generation_students'] || 2791,
            notFirstGen: completionData['latest.completion.2_yr_completion.no_first_generation_students'] || 680,
            pellGrant: completionData['latest.completion.2_yr_completion.pell_grant'] || 3056,
            noPellGrant: completionData['latest.completion.2_yr_completion.no_pell_grant'] || 415
          },
          { 
            timeframe: '3 YEAR', 
            overall: completionData['latest.completion.3_yr_completion.overall'] || 3783,
            male: completionData['latest.completion.3_yr_completion.male_students'] || 1640,
            female: completionData['latest.completion.3_yr_completion.female_students'] || 2143,
            lowIncome: completionData['latest.completion.3_yr_completion.low_income'] || 2085,
            middleIncome: completionData['latest.completion.3_yr_completion.middle_income'] || 1340,
            highIncome: completionData['latest.completion.3_yr_completion.high_income'] || 358,
            firstGen: completionData['latest.completion.3_yr_completion.first_generation_students'] || 3025,
            notFirstGen: completionData['latest.completion.3_yr_completion.no_first_generation_students'] || 758,
            pellGrant: completionData['latest.completion.3_yr_completion.pell_grant'] || 3271,
            noPellGrant: completionData['latest.completion.3_yr_completion.no_pell_grant'] || 512
          },
          { 
            timeframe: '4 YEAR', 
            overall: completionData['latest.completion.4_yr_completion.overall'] || 4096,
            male: completionData['latest.completion.4_yr_completion.male_students'] || 1848,
            female: completionData['latest.completion.4_yr_completion.female_students'] || 2248,
            lowIncome: completionData['latest.completion.4_yr_completion.low_income'] || 2340,
            middleIncome: completionData['latest.completion.4_yr_completion.middle_income'] || 1378,
            highIncome: completionData['latest.completion.4_yr_completion.high_income'] || 378,
            firstGen: completionData['latest.completion.4_yr_completion.first_generation_students'] || 3275,
            notFirstGen: completionData['latest.completion.4_yr_completion.no_first_generation_students'] || 821,
            pellGrant: completionData['latest.completion.4_yr_completion.pell_grant'] || 3566,
            noPellGrant: completionData['latest.completion.4_yr_completion.no_pell_grant'] || 530
          },
          { 
            timeframe: '6 YEAR', 
            overall: completionData['latest.completion.6_yr_completion.overall'] || 4607,
            male: completionData['latest.completion.6_yr_completion.male_students'] || 2131,
            female: completionData['latest.completion.6_yr_completion.female_students'] || 2476,
            lowIncome: completionData['latest.completion.6_yr_completion.low_income'] || 2790,
            middleIncome: completionData['latest.completion.6_yr_completion.middle_income'] || 1419,
            highIncome: completionData['latest.completion.6_yr_completion.high_income'] || 398,
            firstGen: completionData['latest.completion.6_yr_completion.first_generation_students'] || 3668,
            notFirstGen: completionData['latest.completion.6_yr_completion.no_first_generation_students'] || 939,
            pellGrant: completionData['latest.completion.6_yr_completion.pell_grant'] || 3979,
            noPellGrant: completionData['latest.completion.6_yr_completion.no_pell_grant'] || 628
          },
          { 
            timeframe: '8 YEAR', 
            overall: completionData['latest.completion.8_yr_completion.overall'] || 5036,
            male: completionData['latest.completion.8_yr_completion.male_students'] || 2278,
            female: completionData['latest.completion.8_yr_completion.female_students'] || 2758,
            lowIncome: completionData['latest.completion.8_yr_completion.low_income'] || 3043,
            middleIncome: completionData['latest.completion.8_yr_completion.middle_income'] || 1634,
            highIncome: completionData['latest.completion.8_yr_completion.high_income'] || 359,
            firstGen: completionData['latest.completion.8_yr_completion.first_generation_students'] || 4061,
            notFirstGen: completionData['latest.completion.8_yr_completion.no_first_generation_students'] || 975,
            pellGrant: completionData['latest.completion.8_yr_completion.pell_grant'] || 4380,
            noPellGrant: completionData['latest.completion.8_yr_completion.no_pell_grant'] || 656
          }
        ];

        setDashboardData({ timeframeData });
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to hardcoded data if CSV fails to load
        const fallbackData = [
          { timeframe: '2 YEAR', overall: 3471, male: 1573, female: 1898, lowIncome: 1947, middleIncome: 1215, highIncome: 309, firstGen: 2791, notFirstGen: 680, pellGrant: 3056, noPellGrant: 415 },
          { timeframe: '3 YEAR', overall: 3783, male: 1640, female: 2143, lowIncome: 2085, middleIncome: 1340, highIncome: 358, firstGen: 3025, notFirstGen: 758, pellGrant: 3271, noPellGrant: 512 },
          { timeframe: '4 YEAR', overall: 4096, male: 1848, female: 2248, lowIncome: 2340, middleIncome: 1378, highIncome: 378, firstGen: 3275, notFirstGen: 821, pellGrant: 3566, noPellGrant: 530 },
          { timeframe: '6 YEAR', overall: 4607, male: 2131, female: 2476, lowIncome: 2790, middleIncome: 1419, highIncome: 398, firstGen: 3668, notFirstGen: 939, pellGrant: 3979, noPellGrant: 628 },
          { timeframe: '8 YEAR', overall: 5036, male: 2278, female: 2758, lowIncome: 3043, middleIncome: 1634, highIncome: 359, firstGen: 4061, notFirstGen: 975, pellGrant: 4380, noPellGrant: 656 }
        ];
        setDashboardData({ timeframeData: fallbackData });
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading completion data...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading data. Please try again.</p>
        </div>
      </div>
    );
  }

  const { timeframeData } = dashboardData;

  // Rest of your existing dashboard code here...
  const incomeData = timeframeData.map(item => ({
    timeframe: item.timeframe,
    'Low Income': item.lowIncome,
    'Middle Income': item.middleIncome,
    'High Income': item.highIncome
  }));

  const genderData = timeframeData.map(item => ({
    timeframe: item.timeframe,
    'Male': item.male,
    'Female': item.female,
    'Total': item.male + item.female
  }));

  const firstGenData = timeframeData.map(item => ({
    timeframe: item.timeframe,
    'First Generation': item.firstGen,
    'Not First Generation': item.notFirstGen
  }));

  const pellGrantData = timeframeData.map(item => ({
    timeframe: item.timeframe,
    'Pell Grant Recipients': item.pellGrant,
    'Non-Pell Recipients': item.noPellGrant
  }));

  // Calculate completion rates and gaps
  const completionGaps = timeframeData.map(item => {
    const total = item.male + item.female;
    return {
      timeframe: item.timeframe,
      genderGap: ((item.female - item.male) / total * 100).toFixed(1),
      incomeGap: ((item.highIncome - item.lowIncome) / (item.lowIncome + item.middleIncome + item.highIncome) * 100).toFixed(1),
      firstGenGap: ((item.notFirstGen - item.firstGen) / (item.firstGen + item.notFirstGen) * 100).toFixed(1)
    };
  });

  // Key metrics for cards
  const latestData = timeframeData[timeframeData.length - 1]; // 8-year data
  const totalCompletions = latestData.overall;
  const genderGap = ((latestData.female - latestData.male) / (latestData.male + latestData.female) * 100).toFixed(1);
  const firstGenRate = (latestData.firstGen / (latestData.firstGen + latestData.notFirstGen) * 100).toFixed(1);
  const pellRate = (latestData.pellGrant / (latestData.pellGrant + latestData.noPellGrant) * 100).toFixed(1);

  // Calculate dynamic pie chart data based on selected timeframe
  const getIncomeBreakdownData = (timeframe) => {
    const selectedData = timeframeData.find(item => item.timeframe === timeframe);
    if (!selectedData) return [];
    
    const total = selectedData.lowIncome + selectedData.middleIncome + selectedData.highIncome;
    
    return [
      { 
        name: 'Low Income', 
        value: selectedData.lowIncome,
        percentage: ((selectedData.lowIncome / total) * 100).toFixed(1)
      },
      { 
        name: 'Middle Income', 
        value: selectedData.middleIncome,
        percentage: ((selectedData.middleIncome / total) * 100).toFixed(1)
      },
      { 
        name: 'High Income', 
        value: selectedData.highIncome,
        percentage: ((selectedData.highIncome / total) * 100).toFixed(1)
      }
    ];
  };

  const dynamicIncomeData = getIncomeBreakdownData(selectedTimeframe);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const MetricCard = ({ title, value, icon: Icon, subtitle, trend, color = 'blue' }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
        <div className={`p-3 bg-${color}-100 rounded-full`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveView(id)}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
        activeView === id
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Completion & Success Analytics
          </h1>
          <p className="text-gray-600">Montgomery College • Completion Rates by Demographics & Timeframes</p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">Data Source: Student Completion Tracking</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          <TabButton id="overview" label="Overview" icon={Target} />
          <TabButton id="demographics" label="Demographics" icon={Users} />
          <TabButton id="trends" label="Trends" icon={TrendingUp} />
          <TabButton id="gaps" label="Equity Gaps" icon={AlertCircle} />
        </div>

        {/* Overview Tab */}
        {activeView === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Gender Gap"
                value={`${Math.abs(genderGap)}%`}
                icon={User}
                subtitle="Female advantage"
                color="purple"
              />
              <MetricCard
                title="First-Gen Rate"
                value={`${firstGenRate}%`}
                icon={Users}
                subtitle="First-generation students"
                color="orange"
              />
              <MetricCard
                title="Pell Recipients"
                value={`${pellRate}%`}
                icon={CheckCircle}
                subtitle="Financial aid recipients"
                color="blue"
              />
              <MetricCard
                title="8-Year Completions"
                value={totalCompletions.toLocaleString()}
                icon={Award}
                subtitle="Total successful completions"
                color="green"
              />
            </div>

            {/* Completion Timeline Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Completion Timeline Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Timeframe</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Completions</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Male Students</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Female Students</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Low Income</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">First Generation</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Pell Recipients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeframeData.map((item, index) => (
                      <tr key={item.timeframe} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-blue-600 mr-2" />
                            {item.timeframe}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-lg text-blue-900">
                          {item.overall.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {item.male.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {item.female.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {item.lowIncome.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {item.firstGen.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {item.pellGrant.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Complete Timeline:</strong> This table shows student completion progression from 2-8 years, 
                  demonstrating steady growth in student success across all demographic groups over extended timeframes.
                </p>
              </div>
            </div>

            {/* Completion Timeline Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Completion Numbers by Timeframe</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={timeframeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timeframe" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'Students']} />
                  <Area 
                    type="monotone" 
                    dataKey="overall" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Demographics Tab */}
        {activeView === 'demographics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gender Comparison */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Completion by Gender</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={genderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeframe" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Male" fill="#3B82F6" />
                    <Bar dataKey="Female" fill="#EC4899" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {dynamicIncomeData.map((item, index) => (
                    <div key={item.name} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className={`w-4 h-4 rounded-full mx-auto mb-2`} 
                           style={{backgroundColor: ['#EF4444', '#F59E0B', '#10B981'][index]}}></div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-lg font-bold">{item.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* First Generation Status */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">First-Generation Student Success</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={firstGenData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeframe" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="First Generation" fill="#8B5CF6" />
                    <Bar dataKey="Not First Generation" fill="#06B6D4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pell Grant Recipients */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Financial Aid Recipients</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={pellGrantData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeframe" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="Pell Grant Recipients" 
                      stackId="1"
                      stroke="#059669" 
                      fill="#059669" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="Non-Pell Recipients" 
                      stackId="1"
                      stroke="#DC2626" 
                      fill="#DC2626" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeView === 'trends' && (
          <div className="space-y-8">
            {/* Multi-line Trend Analysis */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Completion Trends by Demographics</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timeframeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timeframe" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="male" stroke="#3B82F6" strokeWidth={2} name="Male" />
                  <Line type="monotone" dataKey="female" stroke="#EC4899" strokeWidth={2} name="Female" />
                  <Line type="monotone" dataKey="lowIncome" stroke="#EF4444" strokeWidth={2} name="Low Income" />
                  <Line type="monotone" dataKey="highIncome" stroke="#10B981" strokeWidth={2} name="High Income" />
                  <Line type="monotone" dataKey="firstGen" stroke="#8B5CF6" strokeWidth={2} name="First Gen" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Completion Rate Growth */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Year-over-Year Growth</h3>
                <div className="space-y-4">
                  {timeframeData.slice(1).map((item, index) => {
                    const prevItem = timeframeData[index];
                    const growth = prevItem ? ((item.overall - prevItem.overall) / prevItem.overall * 100).toFixed(1) : 0;
                    return (
                      <div key={item.timeframe} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">{item.timeframe}</span>
                        <div className="text-right">
                          <div className="text-lg font-bold">{item.overall.toLocaleString()}</div>
                          {prevItem && (
                            <div className={`text-sm ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {growth > 0 ? '+' : ''}{growth}%
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Overall Completion Trend */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Completion Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={timeframeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeframe" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="overall" 
                      stroke="#2563eb" 
                      strokeWidth={3}
                      dot={{ fill: '#2563eb', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Equity Gaps Tab */}
        {activeView === 'gaps' && (
          <div className="space-y-8">
            {/* Gap Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Gender Gap</h3>
                  <User className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-3xl font-bold text-red-600">{Math.abs(genderGap)}%</p>
                <p className="text-sm text-gray-600 mt-1">Female advantage in completion rates</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Female (8-year):</span>
                    <span className="font-medium">{latestData.female.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Male (8-year):</span>
                    <span className="font-medium">{latestData.male.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Income Gap</h3>
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-orange-600">
                  {(((latestData.highIncome / (latestData.lowIncome + latestData.middleIncome + latestData.highIncome)) - 
                     (latestData.lowIncome / (latestData.lowIncome + latestData.middleIncome + latestData.highIncome))) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Completion rate difference by income</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Low Income:</span>
                    <span className="font-medium">{latestData.lowIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>High Income:</span>
                    <span className="font-medium">{latestData.highIncome.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">First-Gen Gap</h3>
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {(((latestData.notFirstGen / (latestData.firstGen + latestData.notFirstGen)) - 
                     (latestData.firstGen / (latestData.firstGen + latestData.notFirstGen))) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Non-first-gen advantage</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>First Generation:</span>
                    <span className="font-medium">{latestData.firstGen.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Not First Gen:</span>
                    <span className="font-medium">{latestData.notFirstGen.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Equity Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-900 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Male Student Support
                    </h4>
                    <p className="text-red-700 text-sm mt-1">
                      Implement targeted mentoring and academic support programs for male students 
                      to address the {Math.abs(genderGap)}% completion gap.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-orange-900 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Low-Income Student Success
                    </h4>
                    <p className="text-orange-700 text-sm mt-1">
                      Expand financial aid, emergency funds, and wraparound services for 
                      low-income students who represent the largest completion group.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-900 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      First-Generation Programs
                    </h4>
                    <p className="text-purple-700 text-sm mt-1">
                      Strengthen first-generation student programs, as they represent 
                      {firstGenRate}% of completers and need additional support systems.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Early Intervention
                    </h4>
                    <p className="text-blue-700 text-sm mt-1">
                      Focus on 2-4 year completion support, as major progress occurs 
                      during these critical timeframes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletionDashboard;
              </div>

              {/* Interactive Income Level Comparison */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Completion Breakdown by Income Level</h3>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="timeframe-select" className="text-sm font-medium text-gray-700">
                      Timeframe:
                    </label>
                    <select
                      id="timeframe-select"
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {timeframeData.map(item => (
                        <option key={item.timeframe} value={item.timeframe}>
                          {item.timeframe}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dynamicIncomeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percentage}) => `${name}: ${percentage}%`}
                    >
                      {dynamicIncomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#EF4444', '#F59E0B', '#10B981'][index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [
                      `${value.toLocaleString()} students (${dynamicIncomeData.find(d => d.name === name)?.percentage}%)`,
                      name
                    ]} />
                  </PieChart>
